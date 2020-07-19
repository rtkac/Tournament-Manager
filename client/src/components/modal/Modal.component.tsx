import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import T from 'i18n/translationsKeyMapping';

import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import Alert from 'baseui/icon/alert';

import { ModalBodyDiv, ModalBodyIcon, ModalBodyPar } from './Modal.component.style';

const ModalComponent = (props: ModalComponentProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      setIsOpen(true);
    }
  }, [props.isOpen, setIsOpen]);

  const close = () => {
    if (props.closeHandler) {
      props.closeHandler();
    }
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>
          <ModalBodyDiv>
            <ModalBodyIcon>
              <Alert size={28} />
            </ModalBodyIcon>
            <ModalBodyPar>{props.body}</ModalBodyPar>
          </ModalBodyDiv>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={close}>{t(T.MODAL.BUTTON.CLOSE.LABEL)}</ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

interface ModalComponentProps {
  title?: string;
  body: React.ReactNode | string;
  isOpen: boolean;
  closeHandler?: () => void;
}

export default ModalComponent;
