import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchVotingdapp,
  getCloseInstruction,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

import { BankrunProvider, startAnchor } from "anchor-bankrun";

import { Votingdapp } from '../target/types/votingdapp.ts';
const IDL = require('../target/idl/votingdapp.json');

const votingDappAddress = new PublicKey("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

describe('votingdapp', () => {

  it('Initialize Poll', async () => {
    const context = await startAnchor("", [{name: "votingDapp", programId: votingDappAddress}], []);
    const provider = new BankrunProvider(context);

    const votingProgram = new Program<VotingDapp>(
      IDL,
      provider,
    );

    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "What is your favorite type of peanut butter?",
      new anchor.BN(0),
      new anchor.BN(1856989183),
    ).rpc();

  });
});