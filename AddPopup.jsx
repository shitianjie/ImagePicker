import React from 'react';

import PopUpo from '../PopUpo/PopUpo.jsx';

export default WrappedComponent => class extends WrappedComponent {
  render() {
    const {showPopupMsg} = this.state;
    return (
      <section>
        {super.render()}
        <PopUpo text={showPopupMsg} show={!!showPopupMsg} closeDelay={5000} closePopup={() => !showPopupMsg} />
      </section>
    )
  }
}
