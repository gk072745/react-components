import { useNavigate } from "react-router-dom";

export function useCommonUtilities() {
  const navigate = useNavigate();

  function capitalizeFirstLetter(string) {
    let lowercasedString = string.toLowerCase();
    return lowercasedString.charAt(0).toUpperCase() + lowercasedString.slice(1);
  }

  function goToRoute(path) {
    navigate(path);
  }

  async function copyToClipboard(textToCopy) {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return {
    capitalizeFirstLetter,
    goToRoute,
    copyToClipboard,
  };
}
