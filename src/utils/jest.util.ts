export function getAggregateMockValue<D = any>(data: D): any {
  const aggregateMock = {
    addFields: jest.fn().mockReturnThis(),
    match: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    group: jest.fn().mockReturnThis(),
    lookup: jest.fn().mockReturnThis(),
    unwind: jest.fn().mockReturnThis(),
    project: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(data),
  } as any;

  return aggregateMock;
}
