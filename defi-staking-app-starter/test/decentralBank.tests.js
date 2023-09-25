const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }
  before(async () => {
    // load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // transfer all token to decentralbank address
    await rwd.transfer(decentralBank.address, tokens("1000000"));
    // transfer token to investor
    await tether.transfer(customer, tokens("100"), { from: owner });
  });
  describe("Mock tether deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether");
    });
  });

  describe("Reward Token", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("DecentralaBank deploy ", async () => {
    it("Token available in customer wallet", async () => {
      const amount = await tether.balanceOf(customer);
      assert.equal(amount, tokens("100"));
    });

    it("Token available in Bank", async () => {
      const amount = await rwd.balanceOf(decentralBank.address);
      assert.equal(amount, tokens("1000000"));
    });

    describe("Yield farming", async () => {
      it("Reward token for farming", async () => {
        let result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens("100"),
          "investor mock tether balance before staking"
        );
        // check staking customer
        let staking = await decentralBank.isStaking(customer)
        assert.equal(staking, false)
        await tether.approve(decentralBank.address, tokens("99"), {
          from: customer,
        });
        await decentralBank.deposit(tokens("99"), { from: customer });

        result = await tether.balanceOf(customer);
        assert.equal(result.toString(), tokens("1"));
        result = await tether.balanceOf(decentralBank.address);
        assert.equal(result.toString(), tokens("99"));

        // is staking test
         staking = await decentralBank.isStaking(customer)
        assert.equal(staking, true)
      });
    });
  });
});
