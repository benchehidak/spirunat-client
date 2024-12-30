// Delete Product from List By Id
export const deleteProduct = (list, id) => {
    const filter = list.filter((item) => item.id !== id);
    return filter;
  };
  
  // Find Product Index From List
  export const findProductIndex = (list, slug) => {
    console.log("slug", decodeURI(slug));
    // console.log(list, "list")
    const index = list.findIndex((item) => item.slug === decodeURI(slug));
    // console.log("index", index)
    return index;
  };
  export const findProductIndexById = (list, id) => {
    const index = list.findIndex((item) => item.id === id);
    return index;
  };
  