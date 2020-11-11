export const TOKEN_KEY = 'token';

/**
 * Метод сохранения токена в локальное хранилище браузера
 *@ignore
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Метод получения токена из локального хранилища браузера
 * @ignore
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * Метод удаления токена из локального хранилища браузера
 * @ignore
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
}
