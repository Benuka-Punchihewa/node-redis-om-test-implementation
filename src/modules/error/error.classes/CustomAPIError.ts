class CustomAPIError extends Error {
  data: {};
  constructor(message: string, data?: {}) {
    super(message);
    
    if (data) this.data = data;
    else this.data = {};
  }
}

export default CustomAPIError;
