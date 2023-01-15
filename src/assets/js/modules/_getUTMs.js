import GET from './_getSearchParams'
import debugLog from './_debugLog'
import Cookies from 'js-cookie'

export default () => {

    let UTMs = {};

    const campaign = GET('utm_campaign')
    const source = GET('utm_source')
    const medium = GET('utm_medium')
    const term = GET('utm_term')
    const content = GET('utm_content')

    if (campaign || source || medium || term || content) {

        if (campaign) UTMs.campaign = campaign
        if (source) UTMs.source = source
        if (medium) UTMs.medium = medium
        if (term) UTMs.term = term
        if (content) UTMs.content = content

        // TODO add validation is cookie allowed
        Cookies.set('__az_utm', JSON.stringify(UTMs), {
            expires: 7,
            path: '/'
        })

    } else if (Cookies.get('__az_utm')) {

        UTMs = JSON.parse(Cookies.get('__az_utm'))

    }

    debugLog('UTM params', UTMs)

    return UTMs

}
