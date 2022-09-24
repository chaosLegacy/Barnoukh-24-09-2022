import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

type ModalProps = {
    children: React.ReactNode
    modalIsOpen: boolean
    onRequestClose: () => void
}
export const Modal = ({
    children,
    modalIsOpen,
    onRequestClose
}: ModalProps) => {
  return (
      <ReactModal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick
          onRequestClose={onRequestClose}
          style={{
              overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(000, 000, 000, 0.9)'
              },
              content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  padding: 0,
                  background: 'transparent',
                  border: 'none',
                  transform: 'translate(-50%, -50%)'
              }
          }}
      >
          {children}
      </ReactModal>
  )
}
