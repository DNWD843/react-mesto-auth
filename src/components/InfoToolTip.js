
function InfoToolTip(props) {
  return (
    <div onClick={ props.onOverlayClick } className={ `popup page__overlay page__overlay_theme_light popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}` } id={ props.name }>
      <div className="popup__container">
        <button type="button" onClick={ props.onClose } className="button button_type_close popup__close-button" name="close-popup" value="Закрыть"></button>

      </div>
    </div>
  )
}

export default InfoToolTip;
