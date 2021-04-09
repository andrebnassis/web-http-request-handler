export const getRelativePath = (url:URL):string =>{
    return `${url.pathname}${url.search}${url.hash}`;
}

export const getBasePath = (url:URL):string => {
    const relativePath = getRelativePath(url);
    const relativePathStartIndex = url.href.lastIndexOf(relativePath);
    return url.href.substring(0,relativePathStartIndex);
}