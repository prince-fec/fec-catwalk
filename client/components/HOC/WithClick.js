import React from 'react';

const withClick = (Component) => {
  return class WithClick extends React.Component {
    render() {
      // console.log(Component)
      return(
      <div onClick={() => console.log(this.props, this.props.id)}>
        <Component {...this.props}>
        </Component>
      </div>
      )
    }
  }
}

export default withClick