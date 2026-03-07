'use client';

import { useCallback } from 'react';
import { useDebateStore, DebateMessage, DebateParticipant } from './store';

export function useDebate() {
  const {
    messages,
    currentTurn,
    isLoading,
    debateTopic,
    setTopic,
    addMessage,
    setLoading,
    setCurrentTurn,
    clearDebate,
  } = useDebateStore();

  const startDebate = useCallback(async (topic: string) => {
    setTopic(topic);
    setLoading(true);
    setCurrentTurn('rationalist');
    
    try {
      // Turn 1: Get moderator frame
      const modResponse = await fetch('/api/debate/moderator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, history: [] }),
      });
      
      if (!modResponse.ok) throw new Error('Failed to get moderator response');
      
      const modData = await modResponse.json();
      addMessage({ role: 'moderator', content: modData.content });
      
      // Now start the debate with rationalist
      setCurrentTurn('rationalist');
      setLoading(false);
    } catch (error) {
      console.error('Error starting debate:', error);
      setLoading(false);
      addMessage({ 
        role: 'moderator', 
        content: 'I apologize, but I am unable to begin the dialectic at this moment. Please try again.' 
      });
    }
  }, [addMessage, setLoading, setTopic, setCurrentTurn]);

  const sendToRationalist = useCallback(async () => {
    if (!debateTopic) return;
    
    setLoading(true);
    setCurrentTurn('rationalist');
    
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch('/api/debate/rationalist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: debateTopic, 
          history,
          userMessage: messages.find(m => m.role === 'user')?.content || debateTopic,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to get rationalist response');
      
      if (!response.body) throw new Error('No response body');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
      
      addMessage({ role: 'rationalist', content: fullContent });
    } catch (error) {
      console.error('Error in rationalist turn:', error);
      addMessage({ 
        role: 'rationalist', 
        content: 'I apologize, but I am unable to provide a rational perspective at this time.' 
      });
    } finally {
      setLoading(false);
    }
  }, [addMessage, debateTopic, messages, setLoading]);

  const sendToMystic = useCallback(async () => {
    if (!debateTopic) return;
    
    setLoading(true);
    setCurrentTurn('mystic');
    
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch('/api/debate/mystic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: debateTopic, 
          history,
          userMessage: messages.find(m => m.role === 'user')?.content || debateTopic,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to get mystic response');
      
      if (!response.body) throw new Error('No response body');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
      
      addMessage({ role: 'mystic', content: fullContent });
    } catch (error) {
      console.error('Error in mystic turn:', error);
      addMessage({ 
        role: 'mystic', 
        content: 'The mystery remains unspoken. I am unable to share the intuitive perspective at this time.' 
      });
    } finally {
      setLoading(false);
    }
  }, [addMessage, debateTopic, messages, setLoading]);

  const nextTurn = useCallback(async () => {
    if (currentTurn === 'rationalist') {
      await sendToMystic();
    } else if (currentTurn === 'mystic') {
      // Return to rationalist for another round
      setCurrentTurn('rationalist');
    }
  }, [currentTurn, sendToMystic]);

  return {
    messages,
    currentTurn,
    isLoading,
    debateTopic,
    startDebate,
    sendToRationalist,
    sendToMystic,
    nextTurn,
    clearDebate,
  };
}
