// Polyfills for Cloudflare Workers runtime compatibility

// MessageChannel polyfill
if (typeof globalThis.MessageChannel === 'undefined') {
  class MessageChannelPolyfill {
    port1: MessagePort;
    port2: MessagePort;
    
    constructor() {
      const port1 = new MessagePortPolyfill();
      const port2 = new MessagePortPolyfill();
      
      // Connect the ports
      port1._other = port2;
      port2._other = port1;
      
      this.port1 = port1 as unknown as MessagePort;
      this.port2 = port2 as unknown as MessagePort;
    }
  }
  
  class MessagePortPolyfill {
    onmessage: ((event: MessageEvent) => void) | null = null;
    _other: MessagePortPolyfill | null = null;
    
    postMessage(data: any) {
      if (this._other && this._other.onmessage) {
        setTimeout(() => {
          this._other!.onmessage!(new MessageEvent('message', { data }));
        }, 0);
      }
    }
    
    start() {
      // No-op for polyfill
    }
    
    close() {
      // No-op for polyfill
    }
  }
  
  globalThis.MessageChannel = MessageChannelPolyfill as any;
  globalThis.MessagePort = MessagePortPolyfill as any;
}

// Additional polyfills for React SSR compatibility
if (typeof globalThis.global === 'undefined') {
  globalThis.global = globalThis;
}

// Polyfill for TextEncoder/TextDecoder if needed
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = class TextEncoder {
    encode(input: string): Uint8Array {
      const encoder = new TextEncoder();
      return encoder.encode(input);
    }
  } as any;
}

if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = class TextDecoder {
    decode(input: Uint8Array): string {
      const decoder = new TextDecoder();
      return decoder.decode(input);
    }
  } as any;
}

export {}; 