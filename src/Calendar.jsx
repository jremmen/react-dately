import React, { Component, PropTypes } from 'react'
import Dately from './Dately'
import PrevMonth from './PrevMonth'
import NextMonth from './NextMonth'
import utils from './utils'

const { isSame, isBeforeDay, isAfterDay, getDaysBetween, getMonths } = utils

class Calendar extends Component {
  static propTypes = {
    modifiers: PropTypes.array,
    renderDay: PropTypes.func
  }

  static defaultProps = {
    modifiers: [],
    renderDay: date => date.getDate()
  }

  _renderDay = (date, { modifiers, ...props }, rules) => {
    let className = 'cal__day'
    
    // build the final class name string with all respective modifiers
    className += modifiers.map(modifier => ` ${className}--${modifier}`).join('')
    
    return (
      <td {...props} className={className}>
        {this.props.renderDay(date, rules)}
      </td>
    )
  }

  render() {
    const { minDay, maxDay, modifiers } = this.props
    let className = 'cal'
    
    className += modifiers.map(modifier => ` ${className}--${modifier}`).join('')

    return (
      <Dately
        ref="calendar"
        {...this.props}
        renderDay={this._renderDay}
      >
        {({id, monthLabel, yearLabel, month, weekdays, weeks}) =>
          <div id={id} className={className}>
            <header className="cal__header">
              <PrevMonth
                onClick={() => this.refs.calendar.navigateMonth(-1)}
                innerHTML=""
                disable={minDay && isSame(month, minDay, 'month')}
                controls={id + '__table'}
              />
              <div className="cal__month-year">
                <div className="cal__month">
                  {monthLabel}
                </div>
                <div className="cal__year">
                  {yearLabel}
                </div>
              </div>
              <NextMonth
                onClick={() => this.refs.calendar.navigateMonth(1)}
                innerHTML=""
                disable={maxDay && isSame(month, maxDay, 'month')}
                controls={id + '__table'}
              />
            </header>
            <table className="cal__table">
              <thead>
                <tr className="cal__weekdays">
                  {weekdays.map((weekday, index) =>
                    <th
                      key={index}
                      scope="col"
                      title={weekday}
                      className="cal__weekday"
                    >
                      {weekday}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, index) =>
                  <tr key={index} className="cal__week">
                    {week}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </Dately>
    )
  }
}

export default Calendar