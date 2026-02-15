const B2_ENDPOINT = process.env.B2_ENDPOINT || '';
const B2_REGION = process.env.B2_REGION || 'eu-central-003';
const B2_ACCESS_KEY_ID = process.env.B2_ACCESS_KEY_ID || '';
const B2_SECRET_ACCESS_KEY = process.env.B2_SECRET_ACCESS_KEY || '';
const B2_BUCKET_NAME = process.env.B2_BUCKET_NAME || 'rumi';

interface B2AuthResponse {
  authorizationToken: string;
  apiUrl: string;
  downloadUrl: string;
  bucketId: string;
}

let authCache: { token: string; apiUrl: string; downloadUrl: string; expiresAt: number } | null = null;

async function getAuth(): Promise<{ token: string; apiUrl: string; downloadUrl: string }> {
  if (authCache && authCache.expiresAt > Date.now()) {
    return { token: authCache.token, apiUrl: authCache.apiUrl, downloadUrl: authCache.downloadUrl };
  }

  const response = await fetch(`${B2_ENDPOINT}/b2api/v2/b2_authorize_account`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${B2_ACCESS_KEY_ID}:${B2_SECRET_ACCESS_KEY}`).toString('base64')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`B2 auth error: ${response.statusText}`);
  }

  const data: B2AuthResponse = await response.json();
  
  authCache = {
    token: data.authorizationToken,
    apiUrl: data.apiUrl,
    downloadUrl: data.downloadUrl,
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
  };

  return authCache;
}

export async function uploadFile(
  fileName: string,
  content: ArrayBuffer,
  contentType: string
): Promise<{ url: string; fileId: string }> {
  const { token, apiUrl } = await getAuth();

  // Get upload URL
  const uploadUrlResponse = await fetch(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bucketId: B2_BUCKET_NAME }),
  });

  if (!uploadUrlResponse.ok) {
    throw new Error(`B2 get upload URL error: ${uploadUrlResponse.statusText}`);
  }

  const uploadUrlData = await uploadUrlResponse.json();

  // Upload file
  const uploadResponse = await fetch(uploadUrlData.uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      'X-Bz-File-Name': fileName,
      'X-Bz-Info-Content-Type': contentType,
    },
    body: content,
  });

  if (!uploadResponse.ok) {
    throw new Error(`B2 upload error: ${uploadResponse.statusText}`);
  }

  const uploadData = await uploadResponse.json();
  
  return {
    url: `${authCache?.downloadUrl}/file/${B2_BUCKET_NAME}/${fileName}`,
    fileId: uploadData.fileId,
  };
}

export async function deleteFile(fileId: string): Promise<void> {
  const { token, apiUrl } = await getAuth();

  const response = await fetch(`${apiUrl}/b2api/v2/b2_delete_file_version`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId }),
  });

  if (!response.ok) {
    throw new Error(`B2 delete error: ${response.statusText}`);
  }
}

export async function checkB2Health(): Promise<{ healthy: boolean; message: string }> {
  try {
    const { downloadUrl } = await getAuth();
    return { healthy: true, message: `Backblaze B2 connected (${downloadUrl})` };
  } catch (error) {
    return { healthy: false, message: `Backblaze B2 error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}

export function getPublicUrl(fileName: string): string {
  return `https://${B2_BUCKET_NAME}.s3.${B2_REGION}.backblazeb2.com/${fileName}`;
}
