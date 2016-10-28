function AdjustEvent(eventToken) {
    // iOS & Android
    this.eventToken = eventToken;

    this.revenue = null;
    this.currency = null;

    this.callbackParameters = [];
    this.partnerParameters = [];

    // iOS only
    this.receipt = null;
    this.transactionId = null;

    this.isReceiptSet = false;
}

AdjustEvent.prototype.setRevenue = function(revenue, currency) {
    this.revenue = revenue;
    this.currency = currency;
};

AdjustEvent.prototype.addCallbackParameter = function(key, value) {
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustEvent.prototype.addPartnerParameter = function(key, value) {
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

AdjustEvent.prototype.setTransactionId = function(transactionId) {
    this.transactionId = transactionId;
}

AdjustEvent.prototype.setReceiptForTransactionId = function(receipt, transactionId) {
    this.receipt = receipt;
    this.transactionId = transactionId;
    this.isReceiptSet = true;
}

module.exports = AdjustEvent;