export const tipserConfig = {
    lang: 'en-US',
    env: 'dev',
    primaryColor: '#ff0000',
    useDefaultErrorHandler: true,
    openOldDialog: true,
    eventsHandlers: {
        onError: error => {
            console.log(error);
        },
        onAddToCart: ({ cartSize, product }) => {
            console.log('Hurray, you have added item to cart. ', product);
            console.log('Your cart size is now. ', cartSize);
        },
    },
};
