import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";  // Path to generated types
import { expect } from 'chai';

describe("favorites", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const user = provider.wallet;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  const expectedNumber = new anchor.BN(8);
  const expectedColor = "green";
  const expectedHobbies = ["coding", "Adventuring"];

  it("Sets and gets favorites!", async () => {
    await program.methods
      .setFavorites(expectedNumber, expectedColor, expectedHobbies)
      .accountsPartial({ user: user.publicKey })
      .rpc();

    const favoritesPda = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    )[0];

    const favoritesAccount = await program.account.favorites.fetch(favoritesPda);

    expect(favoritesAccount.number).to.equal(expectedNumber.toNumber());
    expect(favoritesAccount.color).to.equal(expectedColor);
    expect(favoritesAccount.hobbies).to.deep.equal(expectedHobbies);
  });
});