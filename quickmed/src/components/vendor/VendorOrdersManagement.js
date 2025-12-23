import React from 'react';

const VendorOrdersManagement = ({
  orderFilter,
  selectedOrder,
  orders,
  orderTabs,
  formatIndianCurrency,
  setShowNotificationsBellModal,
  notifications,
  setSelectedOrder,
  markOrderReady,
  markOrderPicked,
  printLabel,
  cancelOrder,
  setOrderFilter
}) => {
  const mainContentStyle = {
    padding: '24px',
    minHeight: '100vh',
    backgroundColor: '#E0F2F1',
    '@media (max-width: 768px)': {
      padding: '16px'
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '15px'
    }
  };

  const headerActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'space-between'
    }
  };

  const notificationBellStyle = {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    border: '1px solid #4DB6AC',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const notificationBadgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#009688',
    color: '#FFFFFF',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  };

  const greetingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#124441',
    margin: '0 0 8px 0',
    '@media (max-width: 768px)': {
      fontSize: '24px'
    }
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#4F6F6B',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
  };

  const dateDisplayStyle = {
    fontSize: '14px',
    color: '#4F6F6B',
    fontWeight: '500'
  };

  const orderTabsStyle = {
    display: 'flex',
    gap: '4px',
    backgroundColor: '#FFFFFF',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #4DB6AC',
    marginBottom: '24px',
    flexWrap: 'wrap'
  };

  const orderTabStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  };

  const orderTabActiveStyle = {
    backgroundColor: '#009688',
    color: '#FFFFFF'
  };

  const orderCountStyle = {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'inherit',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600'
  };

  const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: selectedOrder ? '1fr 1fr' : '1fr',
    gap: '24px',
    transition: 'grid-template-columns 0.3s ease',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const sectionStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #4DB6AC'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#124441',
    margin: 0
  };

  const viewAllStyle = {
    fontSize: '14px',
    color: '#009688',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const ordersListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const orderCardStyle = {
    padding: '16px',
    border: '1px solid #4DB6AC',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#FFFFFF'
  };

  const orderCardSelectedStyle = {
    borderColor: '#009688',
    backgroundColor: '#E0F2F1'
  };

  const orderHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  };

  const orderInfoStyle = {
    flex: 1
  };

  const orderIdStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 4px 0'
  };

  const customerNameStyle = {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: 0
  };

  const orderMetaStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px'
  };

  const orderTimeStyle = {
    fontSize: '12px',
    color: '#4F6F6B'
  };

  const deliveryTypeStyle = {
    fontSize: '12px',
    color: '#009688',
    fontWeight: '500'
  };

  const orderItemsStyle = {
    marginBottom: '8px'
  };

  const orderItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#4F6F6B',
    marginBottom: '2px'
  };

  const orderFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const orderTotalStyle = {
    color: '#124441',
    fontWeight: '600'
  };

  const prescriptionBadgeStyle = {
    backgroundColor: '#E0F2F1',
    color: '#009688',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '500'
  };

  const orderDetailsPanelStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #4DB6AC',
    height: 'fit-content'
  };

  const panelHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #4DB6AC'
  };

  const panelTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: 0
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#4F6F6B'
  };

  const panelContentStyle = {
    padding: '20px'
  };

  const customerInfoStyle = {
    marginBottom: '20px'
  };

  const customerPhoneStyle = {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: '4px 0'
  };

  const deliveryAddressStyle = {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: '4px 0'
  };

  const orderItemsDetailedStyle = {
    marginBottom: '20px'
  };

  const itemsTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: '#124441'
  };

  const orderItemDetailedStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #E0F2F1'
  };

  const itemNameStyle = {
    flex: 1,
    fontSize: '14px',
    color: '#124441'
  };

  const itemQuantityStyle = {
    fontSize: '14px',
    color: '#4F6F6B'
  };

  const itemPriceStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#124441'
  };

  const orderTotalSectionStyle = {
    paddingTop: '12px',
    borderTop: '2px solid #4DB6AC',
    textAlign: 'right'
  };

  const orderActionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '16px'
  };

  const orderActionsRowStyle = {
    display: 'flex',
    gap: '6px',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  };

  const orderActionButtonStyle = {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    textAlign: 'center',
    minWidth: '70px',
    maxWidth: '90px'
  };

  const orderActionButtonSecondaryStyle = {
    backgroundColor: 'transparent',
    color: '#009688',
    border: '1px solid #009688',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    textAlign: 'center',
    minWidth: '70px',
    maxWidth: '90px'
  };

  const orderActionButtonSuccessStyle = {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: 'auto',
    minWidth: '120px',
    margin: '0 auto',
    display: 'block'
  };

  const orderActionButtonDangerStyle = {
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    textAlign: 'center',
    minWidth: '70px',
    maxWidth: '90px'
  };

  return (
    <div style={mainContentStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={greetingStyle}>Orders Management</h1>
          <p style={subtitleStyle}>Process and manage customer orders</p>
        </div>
        <div style={headerActionsStyle}>
          <button 
            style={notificationBellStyle}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={notificationBadgeStyle}>
                {notifications.length}
              </span>
            )}
          </button>
          <div style={dateDisplayStyle}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      <div style={orderTabsStyle}>
        {orderTabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...orderTabStyle,
              ...(orderFilter === tab.id ? orderTabActiveStyle : {})
            }}
            onClick={() => setOrderFilter(tab.id)}
          >
            <span>{tab.label}</span>
            <span style={orderCountStyle}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div style={contentGridStyle}>
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>
              {orderTabs.find(tab => tab.id === orderFilter)?.label} Orders
            </h2>
            <span style={viewAllStyle}>
              {orders[orderFilter]?.length || 0} orders
            </span>
          </div>

          <div style={ordersListStyle}>
            {(orders[orderFilter] || []).map(order => (
              <div 
                key={order.id} 
                style={{
                  ...orderCardStyle,
                  ...(selectedOrder?.id === order.id ? orderCardSelectedStyle : {})
                }}
                onClick={() => setSelectedOrder(order)}
              >
                <div style={orderHeaderStyle}>
                  <div style={orderInfoStyle}>
                    <h4 style={orderIdStyle}>{order.id}</h4>
                    <p style={customerNameStyle}>{order.customerName}</p>
                  </div>
                  <div style={orderMetaStyle}>
                    <span style={orderTimeStyle}>{order.orderTime}</span>
                    <span style={deliveryTypeStyle}>{order.deliveryType}</span>
                  </div>
                </div>
                
                <div style={orderItemsStyle}>
                  {order.items.map((item, index) => (
                    <div key={index} style={orderItemStyle}>
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={orderFooterStyle}>
                  <strong style={orderTotalStyle}>
                    {formatIndianCurrency(order.total)}
                  </strong>
                  {order.prescriptionRequired && (
                    <span style={prescriptionBadgeStyle}>Prescription</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedOrder && (
          <div style={orderDetailsPanelStyle}>
            <div style={panelHeaderStyle}>
              <h3 style={panelTitleStyle}>Order Details</h3>
              <button 
                style={closeButtonStyle}
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            <div style={panelContentStyle}>
              <div style={customerInfoStyle}>
                <h4 style={{...customerNameStyle, color: '#124441'}}>{selectedOrder.customerName}</h4>
                <p style={customerPhoneStyle}>{selectedOrder.customerPhone}</p>
                <p style={deliveryAddressStyle}>{selectedOrder.address}</p>
              </div>

              <div style={orderItemsDetailedStyle}>
                <h5 style={itemsTitleStyle}>Order Items</h5>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} style={orderItemDetailedStyle}>
                    <span style={itemNameStyle}>{item.name}</span>
                    <span style={itemQuantityStyle}>Qty: {item.quantity}</span>
                    <span style={itemPriceStyle}>{formatIndianCurrency(item.price)}</span>
                  </div>
                ))}
                <div style={orderTotalSectionStyle}>
                  <strong style={{color: '#124441'}}>Total: {formatIndianCurrency(selectedOrder.total)}</strong>
                </div>
              </div>

              <div style={orderActionsStyle}>
                {orderFilter === 'pending' && (
                  <div style={orderActionsRowStyle}>
                    <button 
                      style={orderActionButtonStyle}
                      onClick={() => markOrderReady(selectedOrder.id)}
                    >
                      Mark Ready
                    </button>
                    <button 
                      style={orderActionButtonSecondaryStyle}
                      onClick={() => printLabel(selectedOrder.id)}
                    >
                      Print Label
                    </button>
                    <button 
                      style={orderActionButtonDangerStyle}
                      onClick={() => cancelOrder(selectedOrder.id)}
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
                {orderFilter === 'ready' && (
                  <div style={orderActionsRowStyle}>
                    <button 
                      style={orderActionButtonSuccessStyle}
                      onClick={() => markOrderPicked(selectedOrder.id)}
                    >
                      Mark as Picked
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOrdersManagement;