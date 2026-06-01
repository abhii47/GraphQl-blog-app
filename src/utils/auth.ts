interface TokenData {
    user:{
        user_id:number,
        name:string,
        email:string
    }
}

export const isAuthentication = (context:TokenData) => {
    if(!context.user){
        throw new Error('Unauthorized');
    }
    return context.user;
}