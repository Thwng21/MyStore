// utils/pagination.js
const paginate = (model, filter = {}, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const sort = options.sort || { createdAt: -1 };
  const populate = options.populate || '';

  return model
    .find(filter)
    .populate(populate)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
};

const paginateWithCount = async (model, filter = {}, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const sort = options.sort || { createdAt: -1 };
  const populate = options.populate || '';

  const [data, total] = await Promise.all([
    model
      .find(filter)
      .populate(populate)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec(),
    model.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNext,
      hasPrev
    }
  };
};

// Alternative simple pagination function
const simplePaginate = (query, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  return query
    .skip(skip)
    .limit(limit);
};

module.exports = {
  paginate,
  paginateWithCount,
  simplePaginate
};