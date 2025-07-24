import { Context, Probot } from "probot";

export default (app: Probot) => {
  app.on(
    "issue_comment.created",
    async (context: Context<"issue_comment.created">) => {
      const body = context.payload.issue.body;
      if (!body) return;
      const match = body.match(
        /\/bounty\s+([0-9]+(?:\.[0-9]+)?)\s+([a-zA-Z]+)/
      );
      if (match) {
        const amount = match[1];
        const token = match[2] as string; // ETH or DAI
        // database logic here
        await context.octokit.issues.createComment(
          context.issue({
            body: `Bounty of ${amount} ${token.toUpperCase()} registered!`,
          })
        );
      }
    }
  );
  app.on("issues.opened", async (context: Context<"issues.opened">) => {
    const body = context.payload.issue.body;
    if (!body) return;
    const match = body.match(/\/bounty\s+([0-9]+(?:\.[0-9]+)?)\s+([a-zA-Z]+)/);
    if (match) {
      const amount = match[1];
      const token = match[2] as string; // ETH or DAI
      // database logic here
      await context.octokit.issues.createComment(
        context.issue({
          body: `Bounty of ${amount} ${token.toUpperCase()} registered!`,
        })
      );
    }
  });
  app.on(
    "pull_request.closed",
    async (context: Context<"pull_request.closed">) => {
      const pr = context.payload.pull_request;
      if (!pr.merged) return;
      const contributor = pr.user.login; // who submitted the PR.
      const merger = pr.merged_by?.login; // Who merged it
      context.log.info(
        `PR #${pr.number} was merged by ${merger}, created by ${contributor}`
      );
      await context.octokit.issues.createComment(
        context.issue({
          issue_number: pr.number,
          body: `✅ PR merged! Great work @${contributor}.`,
        })
      );
    }
  );
};
