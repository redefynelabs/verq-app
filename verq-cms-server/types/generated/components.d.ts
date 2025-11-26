import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalIconLink extends Struct.ComponentSchema {
  collectionName: 'components_global_icon_links';
  info: {
    displayName: 'IconLink';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
  };
}

export interface GlobalLabeledLink extends Struct.ComponentSchema {
  collectionName: 'components_global_labeled_links';
  info: {
    displayName: 'Labeled Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface PortfolioPortfolioCard extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_portfolio_cards';
  info: {
    displayName: 'PortfolioCard';
  };
  attributes: {
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
    WorkImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SharedImageIconInfoGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_icon_info_groups';
  info: {
    displayName: 'ImageIconInfoGroup';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedPoints extends Struct.ComponentSchema {
  collectionName: 'components_shared_points';
  info: {
    displayName: 'Points';
  };
  attributes: {
    desc: Schema.Attribute.Text;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTitleDescGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_title_desc_groups';
  info: {
    displayName: 'TitleDescGroup';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface TeamTeamCard extends Struct.ComponentSchema {
  collectionName: 'components_team_team_cards';
  info: {
    displayName: 'TeamCard';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
    Role: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.icon-link': GlobalIconLink;
      'global.labeled-link': GlobalLabeledLink;
      'portfolio.portfolio-card': PortfolioPortfolioCard;
      'shared.image-icon-info-group': SharedImageIconInfoGroup;
      'shared.media': SharedMedia;
      'shared.points': SharedPoints;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.title-desc-group': SharedTitleDescGroup;
      'team.team-card': TeamTeamCard;
    }
  }
}
