'use strict'
import Join from './join'
import React from 'react'
import injectSheet from 'react-jss'
import Button from './button'
import cx from 'classnames'
import Icon from './lib/icon'
import ConversationHeader from './conversation-header'

const styles = {
  Preamble: {
    fontSize: '1.33rem',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    paddingTop: '1em',
    paddingLeft: '3em',
    paddingRight: '3em',
    overflow: 'hidden',
    textOverflow: 'clip',
    boxSizing: 'border-box',
    transition: 'all 0.5s linear',
    backgroundColor: 'white', //'#F4F4F4',
    '&$agreed': {
      left: '-100vw',
    },
  },
  PreambleList: {
    paddingTop: '0.5em!important',
    paddingLeft: '2em!important',
    '& li': {
      paddingBottom: '0.5em!important',
    },
  },
  agreed: {},
  center: {
    textAlign: 'center',
  },
  'Preamble-inner': {
    marginTop: '6vh',
    // need to have someting here for portrait mode - but don't record in portrait mode for now.
  },
  questionList: {
    listStyleType: 'decimal',
    padding: '0!important',
    paddingLeft: '2em!important',
    '& li': {
      paddingTop: '0.5em',
    },
  },
  questionListInner: {
    listStyleType: 'none',
    paddingLeft: '0!important',
    '& li:last-child': {
      paddingBottom: '0!important',
    },
  },
  questionListInnerHeadless: {
    listStyleType: 'none',
    paddingLeft: '0!important',
    paddingTop: '0!important',
    '& li:first-child': {
      paddingTop: '0',
    },
    '& li:last-child': {
      paddingBottom: '0!important',
    },
  },
}

class CandidateJoin extends Join {
  onChangeActive() {} // don't do anything - there's not need to check email and password comfirmation in this case
  render() {
    const { classes, className, onClick } = this.props
    const { info, successMessage, validationError } = this.state
    return (
      <React.Fragment>
        {!successMessage && (
          <React.Fragment>
            <a className={className} href="#" onClick={this.agree.bind(this)}>
              <Icon className={className} icon="square-o" size="2" ref="agree" name="agree" />
            </a>
            <span className={className}>I agree to the </span>
            <a className={className} href="https://enciv.org/terms/" target="_blank">
              Terms of Service
            </a>
            {info && <span className={className}>{info}</span>}
            {validationError && (
              <span className={className} style={{ color: 'red' }}>
                {validationError}
              </span>
            )}
          </React.Fragment>
        )}
        <div className={classes['center']}>
          <Button onClick={this.skip.bind(this)}>Next</Button>
        </div>
        {successMessage && <span className={className}>{successMessage}</span>}
      </React.Fragment>
    )
  }
}

class CandidatePreamble extends React.Component {
  makeQuestions = questions => {
    const showList = (className, question, index) => (
      <ul className={className}>
        {question.map((q, i) => (
          <li key={index + '-' + i}>{q}</li>
        ))}
      </ul>
    )

    return (
      <ul className={this.props.classes.questionList}>
        {questions.map((question, index) =>
          typeof question === 'string' ? (
            <li key={index}>{question}</li>
          ) : question.length === 1 ? (
            <li key={index}>{question[0]}</li>
          ) : question[0][0] >= '0' && question[0][0] <= '9' ? (
            <li>{showList(this.props.classes.questionListInnerHeadless, question, index)}</li>
          ) : (
            <li>
              {question[0]}
              {showList(this.props.classes.questionListInner, question.slice(1), index)}
            </li>
          )
        )}
      </ul>
    )
  }

  render() {
    const { classes, onClick, agreed, bp_info } = this.props
    return (
      <div className={cx(classes['Preamble'], agreed && classes['agreed'])}>
        <ConversationHeader subject={this.props.subject} bp_info={this.props.bp_info} />
        <div className={classes['Preamble-inner']}>
          <h2>
            Welcome{' '}
            {bp_info && bp_info.candidate_name ? (
              <span style={{ fontSize: '150%', fontWeight: 'bold' }}>{bp_info.candidate_name}</span>
            ) : (
              ''
            )}
          </h2>
          <p>
            Ballotpedia and EnCiv are teaming up to create a better way for candidates to be heard, and voters to learn
            about their candidates.
          </p>
          <p>
            You are invited to engage in an application that will include you, as part of a publicly available online
            video conversation.
          </p>
          <ul className={classes.PreambleList}>
            <li>
              During the conversation, you will be asked questions, and your video will be recorded and stored on your
              computer.
            </li>
            <li>
              At the end of the conversation, you will be asked to review and accept EnCiv's{' '}
              <a href="https://enciv.org/terms" target="_blank">
                terms of service
              </a>{' '}
              and create an account.
            </li>
            <li>
              Then, hitting the <b>Post</b> button will upload the recorded video and make it public.
            </li>
            <li>
              Or, hitting the <b>Hang Up</b> button or closing this window any time before hitting the <b>Post</b>{' '}
              button will cause any recordings to be discarded.
            </li>
          </ul>
          {/*<CandidateJoin classes={classes} userInfo={{email: (bp_info.candidate_email && bp_info.candidate_email[0]) || (bp_info.person_email && bp_info.person_email[0]), name: bp_info.candidate_name}} onChange={onClick}/>*/}
          <h2>Questions for Candidates</h2>
          {this.makeQuestions(this.props.candidate_questions)}
          <div className={classes['center']}>
            <Button onClick={onClick}>Next</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(CandidatePreamble)

/*<p>When you are ready, click <b>Next</b>. After you do, you many need to authorize this app with your browser to use your camera and video.</p>*/
