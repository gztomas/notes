import fake from "fake-words";
import randomColor from "randomcolor";

export interface UserData {
  name: string;
  color: string;
}

let name: string | null, color: string | null;

export const isUserData = (cursors: unknown[]): cursors is UserData[] =>
  cursors.every(
    (cursor) =>
      typeof cursor === "object" &&
      cursor &&
      "name" in cursor &&
      "color" in cursor
  );

/**
 * Randomly provides user data for this session
 */
export const getLocalUser = (): UserData => {
  if (!name || !color) {
    const { firstName, lastName } = fake.user();
    name = `${firstName} ${lastName}`;
    color = randomColor({ luminosity: "dark", format: "rgba", alpha: 1 });
  }

  return { name, color };
};
