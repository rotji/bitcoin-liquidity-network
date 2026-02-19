// Asset.test.ts
// Tests for Asset entity: creation, validation, enable/disable
// To be implemented with Jest



import { describe, it, expect } from '@jest/globals';
import { Asset } from '../../src/core/value-objects/Asset';

describe('Asset', () => {
	it('should create a valid asset', () => {
		const asset = new Asset('btc-1', 'BTC', 8, 'low', true);
		expect(asset.id).toBe('btc-1');
		expect(asset.type).toBe('BTC');
		expect(asset.decimals).toBe(8);
		expect(asset.riskClassification).toBe('low');
		expect(asset.enabled).toBe(true);
	});
	// Next: validation and enable/disable tests
});
