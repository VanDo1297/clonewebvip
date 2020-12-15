import React from 'react';
import {Modal, Button} from 'antd';


const ChangeVipModal = React.memo((props)=>{
    const {isShowModal } = props;

    return (
        <Modal
            title="Basic Modal"
            visible={true}
        >
            <p>Bạn có muốn hủy chức năng VIP của bệnh nhân?</p>
            <div className="d-flex flex-row">
                <Button> Có </Button>
                <Button> Không </Button>
            </div>
      </Modal>
    )
});

export default ChangeVipModal;