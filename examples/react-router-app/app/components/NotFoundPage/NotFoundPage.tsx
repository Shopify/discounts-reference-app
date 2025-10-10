import notFoundImage from "./empty-state.svg";

export function NotFoundPage() {
  return (
    <s-section>
      <s-stack alignItems="center" gap="large">
        <s-image src={notFoundImage} alt="" />
        <s-stack alignItems="center" gap="base">
          <s-heading>There is no page at this address</s-heading>
          <s-text tone="neutral">
            Check the URL and try again, or use the search bar to find what you
            need.
          </s-text>
        </s-stack>
      </s-stack>
    </s-section>
  );
}
