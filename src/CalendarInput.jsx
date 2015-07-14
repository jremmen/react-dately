import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar';

class CalendarInput extends Component {

  static propTypes = {
    date: PropTypes.instanceOf(Date),
    wrapperClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    inputClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    placeholder: PropTypes.string,
    calendarProps: PropTypes.object,
    hiddenValue: PropTypes.bool,
    formatDate: PropTypes.func,
    onDateSelect: PropTypes.func
  }

  static defaultProps = {
    date: new Date(),
    wrapperClassName: null,
    inputClassName: null,
    placeholder: null,
    calendarProps: {modifiers: 'small'},
    hiddenValue: false, // strips name from main input into a hidden one
    formatDate: day => day,
    onDateSelect: () => null
  }

  state = {
    isOpen: false
  }

  componentDidMount() {
    document.addEventListener('click', ::this._documentClickHandler);
  }

  componentDidUnmount() {
    document.removeEventListener('click', ::this._documentClickHandler);
  }

  _documentClickHandler(e) {
    const componentNode = React.findDOMNode(this);
    this.setState({isOpen: componentNode.contains(e.target)});
  }

  _handleCalendarClick(day) {
    this.props.onDateSelect(day);
  }

  render() {

    const formattedDate = this.props.formatDate(this.props.date);

    return(
      <div className={this.props.wrapperClassName}>
        <input
          type="text"
          className={this.props.inputClassName}
          placeholder={this.props.placeholder}
          value={formattedDate}
          readOnly
          aria-haspopup={true}
          aria-readonly={false}
          aria-expanded={this.state.isOpen}
        />
        {
          this.state.isOpen &&
          <Calendar
            onDaySelect={::this._handleCalendarClick}
            {...this.props.calendarProps}
          />
        }
        {
          this.props.hiddenValue &&
          <input type="hidden" value={this.props.date.getTime()} />
        }
      </div>
    );
  }
}

export default CalendarInput;