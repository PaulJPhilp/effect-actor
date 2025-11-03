/**
 * Command to execute on an actor
 */
export type ExecuteCommand = {
	actorType: string;
	actorId: string;
	event: string;
	data?: unknown;
	actor?: string; // WHO executed this (for audit trail)
};

/**
 * Actor state snapshot
 */
export type ActorState = {
	id: string;
	actorType: string;
	state: string;
	context: unknown;
	version: number;
	createdAt: Date;
	updatedAt: Date;
};

/**
 * Result of executing a command/transition
 */
export type ExecutionResult = {
	from: string;
	to: string;
	event: string;
	oldContext: any;
	newContext: any;
	timestamp: Date;
};

/**
 * Query filter for listing actors
 */
export type QueryFilter = {
	status?: string;
	limit?: number;
	offset?: number;
	createdAfter?: Date;
	createdBefore?: Date;
	updatedAfter?: Date;
	updatedBefore?: Date;
};
