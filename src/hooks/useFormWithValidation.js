import { useCallback, useState } from 'react';

/**
 * @module useFormWithValidation
 * @description Пользовательский хук.<br>
 * Запускает валидацию формы, с которой используется. Для запуска валидации, хук
 *  импортируется в компонент с формой и запускается. Хук выполняет валидацию и вывод ошибок
 *  используя браузерную валидацию, т.е. свойство validity объекта ValidityState. Возвращает объект
 *  со стейтами и методами.
 * @returns {Object}  { values, errors, isValid, handleInputChange, setValues, resetForm }
 * @since v.2.0.6
 * @public
 */
export function useFormWithValidation() {

  /**
   * @constant {Object}
   * @name values
   * @description Стейт-переменная, сохраняет значения полей инпутов формы в виде объекта,
   *  в котором у пар "ключ: значение" ключами являются имена инпутов (name),
   *  а значениями - значения полей инпутов (value).
   * @since v.2.0.6
   */
  const [values, setValues] = useState({});

  /**
   * @constant {Object}
   * @name errors
   * @description Стейт-переменная, сохраняет ошибки валидации инпутов формы в виде объекта,
   *  в котором у пар "ключ: значение" ключами являются имена инпутов (name),
   *  а значениями - браузерные сообщения об ошибке.
   * @since v.2.0.6
   */
  const [errors, setErrors] = useState({});

  /**
   * @constant {Boolean}
   * @name isValid
   * @description Стейт-переменная, устанавливающая является ли форма валидной по состоянию
   *  свойства validity объекта ValidityState.<br> true - форма валидна, false - форма не валидна.
   * @since v.2.0.6
   */
  const [isValid, setIsValid] = useState(false);

  /**
   * @method
   * @name handleInputChange
   * @argument {Event} event - событие
   * @description Обработчик изменения полей инпутов.<br> При каждом вводе в поле инпута введенное значение
   *  и результаты валидации введенных значений и формы в целом сохраняются в соответствующие стейты.
   * @public
   * @since v.2.0.6
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
  };

  /**
   * @method
   * @name resetForm
   * @description Сброс формы после ввода значений<br> Если после ввода значений в форму новые значения не были
   * отправлены, форма приводится в изначальное актуальное состояние установкой стейтов в необходимые состояния.
   *  Состояния стейтов передаются аргументами коллбэку метода resetForm.
   * @public
   * @since v.2.0.6
   */
  const resetForm = useCallback(
    /**
     * @function resetForm_callback
     * @param {Object} newValues - новое значение стейта values
     * @param {Object} newErrors - новое значение стейта errors
     * @param {Boolean} newIsValid - новое значение стейта isValid
     * @description Коллбэк метода resetForm.<br> Устанавливает стейты в состояния согласно принятым аргументам.
     * @since v.2.0.6
     */
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues((newValues));
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleInputChange, setValues, resetForm };
};
