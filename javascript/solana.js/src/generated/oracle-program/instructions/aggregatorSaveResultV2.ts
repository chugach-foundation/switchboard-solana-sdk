import type { SwitchboardProgram } from "../../../SwitchboardProgram.js";
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

import * as borsh from "@coral-xyz/borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { AccountMeta, PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { BN } from "@switchboard-xyz/common"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AggregatorSaveResultV2Args {
  params: types.AggregatorSaveResultParamsFields;
}

export interface AggregatorSaveResultV2Accounts {
  aggregator: PublicKey;
  oracle: PublicKey;
  oracleAuthority: PublicKey;
  oracleQueue: PublicKey;
  queueAuthority: PublicKey;
  feedPermission: PublicKey;
  oraclePermission: PublicKey;
  lease: PublicKey;
  escrow: PublicKey;
  tokenProgram: PublicKey;
  programState: PublicKey;
  historyBuffer: PublicKey;
  mint: PublicKey;
}

export const layout = borsh.struct([
  types.AggregatorSaveResultParams.layout("params"),
]);

export function aggregatorSaveResultV2(
  program: SwitchboardProgram,
  args: AggregatorSaveResultV2Args,
  accounts: AggregatorSaveResultV2Accounts,
  programId: PublicKey = program.programId
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.aggregator, isSigner: false, isWritable: true },
    { pubkey: accounts.oracle, isSigner: false, isWritable: true },
    { pubkey: accounts.oracleAuthority, isSigner: true, isWritable: false },
    { pubkey: accounts.oracleQueue, isSigner: false, isWritable: false },
    { pubkey: accounts.queueAuthority, isSigner: false, isWritable: false },
    { pubkey: accounts.feedPermission, isSigner: false, isWritable: true },
    { pubkey: accounts.oraclePermission, isSigner: false, isWritable: false },
    { pubkey: accounts.lease, isSigner: false, isWritable: true },
    { pubkey: accounts.escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.programState, isSigner: false, isWritable: false },
    { pubkey: accounts.historyBuffer, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([33, 3, 188, 52, 185, 222, 0, 4]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.AggregatorSaveResultParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
