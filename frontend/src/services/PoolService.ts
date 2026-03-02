// PoolService: fetch pools, optionally filtered by protocolId
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const API_URL = import.meta.env.VITE_API_URL || '/api';

const mockPools = [
  { id: 1, name: 'Main Pool', protocolId: 1 },
  { id: 2, name: 'ETH Pool', protocolId: 2 },
  { id: 3, name: 'Stacks Pool', protocolId: 3 },
  { id: 4, name: 'RSK Pool', protocolId: 4 },
  { id: 5, name: 'Liquid Pool', protocolId: 5 },
];

export async function getPools(protocolId?: number) {
  if (USE_MOCK_DATA) {
    return protocolId
      ? mockPools.filter((p) => p.protocolId === protocolId)
      : mockPools;
  } else {
    const url = protocolId ? `${API_URL}/pools?protocolId=${protocolId}` : `${API_URL}/pools`;
    const response = await fetch(url);
    return await response.json();
  }
}
