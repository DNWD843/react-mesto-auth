
function InfoToolTip(props) {
  return (
    <div onClick={ props.onOverlayClick } className={ `popup page__overlay page__overlay_theme_light popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}` } id={ props.name }>
      <div className="popup__container">
        <button type="button" onClick={ props.onClose } className="button button_type_close popup__close-button" name="close-popup" value="Закрыть"></button>
        <div className="info-tool-tip popup__info-tool-tip">
          <div className={`info-tool-tip__image ${props.loggedIn ? 'info-tool-tip__image_type_success' : 'info-tool-tip__image_type_fail'}`}></div>
          <p className="info-tool-tip__title">{props.loggedIn ? props.titleTextSuccess : props.titleTextFail}</p>
        </div>

      </div>
    </div>
  )
}

export default InfoToolTip;
