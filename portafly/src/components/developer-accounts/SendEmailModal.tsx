import React, { useState, useMemo } from 'react'
import {
  Modal,
  Button,
  Form,
  FormGroup,
  Text,
  TextInput,
  TextContent,
  TextList,
  TextListItem,
  TextArea
} from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'

import './modals.scss'

interface IProps {
  isOpen: boolean
  admins: string[]
  onClose: () => void
  onSubmit: () => void
}

const SendEmailModal: React.FunctionComponent<IProps> = ({
  isOpen,
  onClose,
  onSubmit,
  admins
}) => {
  const { t } = useTranslation('accounts')

  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [isListCollapsed, setIsListCollapsed] = useState(admins.length > 5)

  const isSendDisabled = subject.length === 0 || body.length === 0

  const actions = [
    <Button
      key="confirm"
      variant="primary"
      onClick={onSubmit}
      isDisabled={isSendDisabled}
    >
      {t('modals.send_email.send')}
    </Button>,
    <Button
      key="cancel"
      variant="link"
      onClick={onClose}
    >
      {t('modals.send_email.cancel')}
    </Button>
  ]

  const textListItems = useMemo(
    () => admins.map((a) => <TextListItem key={a}>{a}</TextListItem>),
    [admins]
  )

  const adminList = isListCollapsed ? (
    <>
      {textListItems.slice(0, 5)}
      <Button component="a" onClick={() => setIsListCollapsed(false)} variant="link">
        {t('modals.expand_list_button', { count: admins.length - 5 })}
      </Button>
    </>
  ) : textListItems

  return (
    <Modal
      width="44%"
      title={t('modals.send_email.title')}
      isOpen={isOpen}
      onClose={onClose}
      actions={actions}
      isFooterLeftAligned
    >
      <TextContent>
        <Text>{t('modals.send_email.to')}</Text>
        <TextList>
          {adminList}
        </TextList>
      </TextContent>
      <Form>
        <FormGroup label={t('modals.send_email.subject')} isRequired fieldId="send-email-subject">
          <TextInput
            isRequired
            type="text"
            id="subject"
            name="subject"
            aria-describedby="subject-helper"
            value={subject}
            onChange={setSubject}
          />
        </FormGroup>
        <FormGroup label={t('modals.send_email.body')} isRequired fieldId="send-email-body">
          <TextArea
            isRequired
            id="body"
            name="body"
            aria-label="aria label"
            value={body}
            onChange={setBody}
          />
        </FormGroup>
      </Form>
    </Modal>
  )
}

export { SendEmailModal }
