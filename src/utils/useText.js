const useText = (text, defaultText = '') => {
  if (text === null || text === '') {
    return defaultText;
  } else {
    return text;
  }
};

export default useText;
