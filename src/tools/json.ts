const json = {
  parse: (str: string) => {
    try {
      return !!str && JSON.parse(str);
    } catch (error) {
      return false;
    }
  }
};

export { json };
