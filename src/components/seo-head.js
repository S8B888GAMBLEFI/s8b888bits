import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as config from "../configuration/Config";

class SeoHead extends React.Component {

  state = {
    submenuDialogStatus: {},

    lang: 'en',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    isRobotNotIndexable: true,
    metaOgTitle: '',
    metaOgDescription: '',
    metaOgUrl: '',
    metaTwitterTitle: '',
    metaTwitterSite: config.BASE_URL,
    metaTwitterDescription: '',
    metaTwitterCreator: '',
  }

  static propTypes = {
    submenuDialogStatus: PropTypes.object,

    lang: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    keywords: PropTypes.string,
    ogTitle: PropTypes.string,
    ogDescription: PropTypes.string,
    ogUrl: PropTypes.string,
    twitterSite: PropTypes.string,
    twitterDescription: PropTypes.string,
    twitterCreator: PropTypes.string,
  }

  static defaultPropTypes = {
    lang: `en`,
    title: ``,
    description: ``,
    keywords: ``,
    ogTitle: ``,
    ogDescription: ``,
    ogUrl: ``,
    twitterSite: ``,
    twitterDescription: ``,
    twitterCreator: ``,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      submenuDialogStatus: props.submenuDialogStatus,

      lang: props.lang || 'en',
      metaTitle: props.title || '',
      metaDescription: props.description || '',
      metaKeywords: props.keywords || '',
      isRobotNotIndexable: (config.ENVIRONMENT_SITE !== "LIVE"), //true
      metaOgTitle: props.ogTitle || '',
      metaOgDescription: props.ogDescription || '',
      metaOgUrl: props.ogUrl || config.BASE_URL,
      metaTwitterTitle: props.twitterTitle || '',
      metaTwitterSite: props.twitterSite || config.BASE_URL,
      metaTwitterDescription: props.twitterDescription || '',
      metaTwitterCreator: props.twitterCreator || '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.submenuDialogStatus) !== JSON.stringify(this.props.submenuDialogStatus)) {
      this.setState({
        submenuDialogStatus: this.props.submenuDialogStatus
      }, () => {
        this.changeHtmlTagStatus();
      })
    }
  }

  changeHtmlTagStatus = () => {
    let htmlClass = (
      (this.state.submenuDialogStatus !== undefined && this.state?.submenuDialogStatus?.status && this.state.submenuDialogStatus.status === "OPEN")
    ) ? 'menu-active' : null;

    if (htmlClass === null) {
      document.getElementsByTagName('html')[0].classList.remove('menu-active');
      document.getElementsByTagName('html')[0].removeAttribute('class');
    } else {
      document.getElementsByTagName('html')[0].classList.add('menu-active');
    }
  }

  slugify_local = (...args) => {
    const value = args.join(' ')

    return value
      .normalize('NFD') // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace('&', 'and')
      .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, '-') // separator
  }

  render() {

    return (
      <>

        <title>{this.state.metaTitle}</title>

        <meta name="title" content={this.state.metaTitle} />
        <meta name="description" content={this.state.metaDescription} />
        <meta name="keywords" content={this.state.metaKeywords} />

        {
          this.state.isRobotNotIndexable ?
            <meta name="robots" content="noindex, nofollow" />
            :
            <meta name="robots" content="index, follow" />
        }

        {
          this.state.isRobotNotIndexable ?
            <meta name="googlebot" content="noindex, nofollow" />
            :
            <meta name="googlebot" content="index, follow" />
        }

        <meta name="og:title" content={this.state.metaOgTitle} />
        <meta name="og:description" content={this.state.metaOgDescription} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={this.state.metaOgUrl} />
        <meta name="twitter:site" content={this.state.metaTwitterSite} />
        <meta name="twitter:card" content="summary" />

        <meta name="twitter:creator" content={this.state.metaTwitterCreator} />

        <meta name="twitter:title" content={this.state.metaTwitterTitle} />
        <meta name="twitter:description" content={this.state.metaTwitterDescription} />
      </>
    )
  }

}

const mapStateToProps = state => {
  const { submenuDialogStatus } = state.submenuDialogStatus;

  return {
    submenuDialogStatus,
  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(SeoHead);

export default hoc;