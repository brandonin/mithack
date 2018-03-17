// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import Claim from './Claim'
import claimsActions from '../../actions/claimsActions'
import withData from '../../hocs/api/withData'
import { doGasClaim, getDisableClaimButton } from '../../modules/claim'

const mapStateToProps = (state: Object) => ({
  disableClaimButton: getDisableClaimButton(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ doGasClaim }, dispatch)

const mapClaimsDataToProps = (claims) => ({
  claimAmount: claims.total
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(claimsActions, mapClaimsDataToProps)
)(Claim)
