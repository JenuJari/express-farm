import { connect } from 'react-redux'

// import components
import Page from './Page'


const mapStateToProps = store => {
    return { isAuthenticated: store.auth.isAuthenticated };
};
  

export default connect(mapStateToProps)(Page)
