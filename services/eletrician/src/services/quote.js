class Quote {
    constructor(id) {
        this.id = id;
        this.title = "here a title";
        this.description = "here a description";
        this.quotation = 1000;
        this.currency = "EUR";
        this.ready = false;
    }

    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = this.description;
    }

    setQuotation(quotation) {
        this.quotation = quotation;
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    setReady(ready) {
        this.ready = ready;
    }
}