export const tipserConfig = {
    lang: 'en',
    env: 'dev',
    primaryColor: 'red',
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
