export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function paginate(
  model: any,
  params: PaginationParams = {},
  where: any = {},
  include: any = {},
  select: any = null
) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, params.limit || 25);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      where,
      ...(select ? { select } : { include }),
      skip,
      take: limit,
      orderBy: params.sortBy ? { [params.sortBy]: params.sortOrder || "desc" } : { createdAt: "desc" },
    }),
    model.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}
