import Container from './container.js'
import Node from './node.js'

declare namespace Declaration {
  export interface DeclarationRaws extends Record<string, unknown> {
    /**
     * The space symbols before the node. It also stores `*`
     * and `_` symbols before the declaration (IE hack).
     */
    before?: string

    /**
     * The symbols between the property and value for declarations.
     */
    between?: string

    /**
     * The content of the important statement, if it is not just `!important`.
     */
    important?: string

    /**
     * Declaration value with comments.
     */
    value?: {
      value: string
      raw: string
    }
  }

  export interface DeclarationProps {
    /** Name of the declaration. */
    prop: string
    /** Value of the declaration. */
    value: string
    /** Whether the declaration has an `!important` annotation. */
    important?: boolean
    /** Information used to generate byte-to-byte equal node string as it was in the origin input. */
    raws?: DeclarationRaws
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  export { Declaration_ as default }
}

/**
 * It represents a class that handles CSS declarations.
 *
 * For more information about CSS declarations, please visit:
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declarations}
 *
 * ```js
 * Once (root, { Declaration }) {
 *   const color = new Declaration({ prop: 'color', value: 'black' })
 *   root.append(color)
 * }
 * ```
 *
 * ```js
 * const root = postcss.parse('a { color: black }')
 * const decl = root.first?.first
 *
 * console.log(decl.type)       //=> 'decl'
 * console.log(decl.toString()) //=> ' color: black'
 * ```
 */
declare class Declaration_ extends Node {
  type: 'decl'
  parent: Container | undefined
  raws: Declaration.DeclarationRaws

  /**
   * The property name for a CSS declaration.
   *
   * ```js
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first?.first
   *
   * console.log(decl.prop) //=> 'color'
   * ```
   */
  prop: string

  /**
   * The property value for a CSS declaration.
   *
   * Any CSS comments inside the value string will be filtered out.
   * CSS comments present in the source value will be available in
   * the `raws` property.
   *
   * Assigning new `value` would ignore the comments in `raws`
   * property while compiling node to string.
   *
   * ```js
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first?.first
   *
   * console.log(decl.value) //=> 'black'
   * ```
   */
  value: string

  /**
   * The `important` property represents a boolean value. If true,
   * the CSS declaration will have important specifier.
   *
   * For more information about CSS important specifier, please visit:
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/important}
   *
   * For more information about CSS Specificity, please visit:
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity}
   *
   * ```js
   * const root = postcss.parse('a { color: black !important; color: red }')
   *
   * console.log(root.first?.first?.important) //=> true
   * console.log(root.first?.last?.important)  //=> undefined
   * ```
   */
  important: boolean

  /**
   * The `variable` method represents a getter that returns true
   * if a declaration starts with `--` or `$`, which are used to
   * declare variables in CSS and SASS/SCSS.
   *
   * ```js
   * const root = postcss.parse(':root { --one: 1 }')
   * const one = root.first?.first
   *
   * console.log(one?.variable) //=> true
   * ```
   *
   * ```js
   * const root = postcss.parse('$one: 1')
   * const one = root.first
   *
   * console.log(one?.variable) //=> true
   * ```
   */
  variable: boolean

  constructor(defaults?: Declaration.DeclarationProps)
  assign(overrides: object | Declaration.DeclarationProps): this
  clone(overrides?: Partial<Declaration.DeclarationProps>): this
  cloneBefore(overrides?: Partial<Declaration.DeclarationProps>): this
  cloneAfter(overrides?: Partial<Declaration.DeclarationProps>): this
}

declare class Declaration extends Declaration_ {}

export = Declaration
