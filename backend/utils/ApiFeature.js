// class ApiFeature{
//     constructor(query,queryStr){
//         this.query=query
//         this.queryStr = queryStr
//     }
//     search(){
//         const keyword = this.queryStr.keyword ? {
//             name:{
//                 $regex : this.queryStr.keyword,
//                 $options : "i",
//             },
//         } : {}
//         console.log(keyword)
//         this.query= this.query.find({...keyword});
//         return this;
//     }
//     filter() {
//         const filterquery = { ...this.queryStr }; // Create a copy of queryStr to avoid modifying the original.
    
//         // Remove some fields:
//         const Removefield = ["keyword", "page", "limit"];
        
//         // Remove the specified fields from the filterquery.
//         Removefield.forEach(key => delete filterquery[key]);
    
//         // Convert the filterquery to a JSON string.
//         let filterString = JSON.stringify(filterquery);
    
//         // Replace specific keys in the filterstring (e.g., "gt" becomes "$gt").
//         filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
//         // Parse the modified filterstring and assign it to this.query.
//         this.query = this.query.find(JSON.parse(filterString));
//         return this;
//     }
    
// }
// module.exports = ApiFeature

class ApiFeature{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr = queryStr;
    }

    search(){
        // console.log("search")
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex : this.queryStr.keyword,
                $options : "i",
            },
        } : {}
        // console.log(keyword)
        this.query= this.query.find({...keyword});
        return this;
    }

    filter(){
        // console.log("filter")

        const filterquery = {...this.queryStr};   // we cant pass referance of this.queryStr so for pass value we use {...}.

        // Remove some fields:
        const Removefield = ["keyword","page","limit"];
        // we remove upper fields from query string
        Removefield.forEach(key=>delete filterquery[key]);
        // "now assign new filte query for find."

        let filterString =JSON.stringify(filterquery)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g,(key) => `$${key}`) 

        this.query = this.query.find(JSON.parse(filterString))
        // console.log(filterString)
        return this;

    }

    Pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resultPerPage * (currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

module.exports = ApiFeature