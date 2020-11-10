
function InfoToolTip({
  name, isOpen, onClose, onOverlayClick, titleTextSuccess, titleTextFail, loggedIn,
}) {
  return (
    <div onClick={ onOverlayClick } className={ `popup page__overlay page__overlay_theme_light popup_type_${name} ${isOpen ? 'popup_opened' : ''}` } id={ name }>
      <div className="popup__container">
        <button type="button" onClick={ onClose } className="button button_type_close popup__close-button popup__close-button_type_info-tool-tip" name="close-popup" value="Закрыть"></button>
        <div className="info-tool-tip popup__info-tool-tip">
          <div className={`info-tool-tip__image ${loggedIn ? 'info-tool-tip__image_type_success' : 'info-tool-tip__image_type_fail'}`}></div>
          <p className="info-tool-tip__title">{loggedIn ? titleTextSuccess : titleTextFail}</p>
        </div>

      </div>
    </div>
  )
}

export default InfoToolTip;
