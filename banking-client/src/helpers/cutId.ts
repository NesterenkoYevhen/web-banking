function cutId(id: string): string {
  return id.split('').slice(0, 8).join('')
};

export default cutId;