const getValidType = (type) => {
  switch (type) {
    case "DEFAULT":
      return "Стандартный";
    case "POSITION":
      return "Позиция";
    case "VALUE":
      return "Супер-игра";
  }
};

export { getValidType };
