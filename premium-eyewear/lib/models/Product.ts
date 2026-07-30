// Mongoose bypass object for Supabase/Express Architecture
const Product: any = {
  find: async () => [],
  findOne: async () => null,
  findById: async () => null,
  findOneAndUpdate: async () => null,
  findOneAndDelete: async () => null,
  lean: function () {
    return this;
  },
};

export default Product;
export { Product };
