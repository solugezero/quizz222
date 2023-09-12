  export const gameAxios = axios.create({
    baseURL: import.meta.env.VITE_API
  })
  
  gameAxios.interceptors.request.use((config) => {
    if (!config.headers) {
      config.headers = {};
    }
  
    config.headers["x-quiz-token"] = localStorage.getItem('token') ?? '';
    return config;
  })
  
  gameAxios.interceptors.response.use((response) => {
    if (!response.data) {
      throw new Error();
    }

    return response.data;
  });
  
  export const questionsGet = async () => {
    return await gameAxios.get('/api/v1/admin/questions');
  }

  export const answersGet = async () => {
    return await gameAxios.get('/api/v1/admin/answers');
  }

  export const questionCreate = async (payload: any) => {
    return await gameAxios.post('/api/v1/admin/question', payload);
  }

  export const questionUpdate = async (id: number, payload: any) => {
    return await gameAxios.put(`/api/v1/admin/question/${id}`, payload);
  }

  export const questionImageUpload = async (questionId: number, file: any, screenshot = false) => {
    const newFile = new FormData()
    newFile.append("file", file)
    return await gameAxios.post(`/api/v1/admin/question/image/${questionId}?screenshot=${screenshot}`, newFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  export const answerUpdate = async (id: number, payload: any) => {
    return await gameAxios.put(`/api/v1/admin/answer/${id}`, payload);
  }

  export const answerDelete = async (id: number) => {
    return await gameAxios.delete(`/api/v1/admin/answer/${id}`);
  }

  export const questionDelete = async (id: number) => {
    return await gameAxios.delete(`/api/v1/admin/question/${id}`);
  }

  export const answerCreate = async (payload: any) => {
    return await gameAxios.post('/api/v1/admin/answer', payload);
  }

  export const gameCreate = async (easy: boolean) => {
    return await gameAxios.get(`/api/v1/game?easy=${easy}`);
  }

  export const gameGetNextQuestion = async (gameId: string) => {
    return await gameAxios.get(`/api/v1/game/nextQuestion/${gameId}`);
  }

  export const gameGetQuestionAnswers = async (questionId: number) => {
    return await gameAxios.get(`/api/v1/game/answer/${questionId}`);
  }

  export const gameEnd = async (gameId: string) => {
    return await gameAxios.delete(`/api/v1/game/${gameId}`);
  }