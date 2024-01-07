---
title: "How to Use Structured Data (Schema Markup) in HubSpot to Improve SEO"
desc: "How to use Structured Data, also referred to as Schema Markup, inside of HubSpot that is populated using HubL variables for use to improve SEO."
date: 2024-01-07
tags: [hubspot, seo, schema-markup, structured-data]
---

Structured data, also known as schema markup, is an important tool that can significantly improve your website's search
engine optimization (SEO). By implementing schema markup in HubSpot, you can provide search engines with valuable
information about your content, helping them to better understand and display your website in search results. In this
blog post, we will explore the benefits of using structured data and provide you a code snippets which you can use to
implement schema markup in HubSpot.

## What is Structured Data?

There are many different types of schemas available on [Schema.org](https://schema.org/), with over 760 listed.
Schema.org is a website created by Bing, Google, and Yahoo to provide a common set of schemas for structured data. It
can be overwhelming for first-time readers to decide which schema to use. However, Google provides a helpful breakdown
of specific schemas that can be used for their rich results. These schemas are listed on
their [search gallery documentation](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).
In this case, we will focus on the Article structured data type, which is commonly used for news, sports, or blog
articles. It allows for features like a Top stories carousel, headline text, and larger-than-thumbnail images.

## The Benefits of Using Structured Data

Using structured data in HubSpot offers several advantages for your website's SEO. First and foremost, it helps search
engines understand the semantics of your content, enabling them to display rich snippets in search results. These
snippets provide users with more detailed and visually appealing information about your website, increasing the
likelihood of attracting clicks. Additionally, structured data helps search engines categorize your content more
accurately, improving its visibility to relevant audiences and increasing organic traffic to your website.

## Implementing Structured Data in HubSpot

To start implementing structured data in HubSpot, you first need to identify the content elements that would benefit
from schema markup. This could include blog posts, product pages, events, and more. Once you have identified the
relevant content, you can proceed with adding schema markup to your HubSpot templates. HubSpot provides a user-friendly
interface that allows you to easily edit your templates, insert schema markup, and preview the changes. Be sure to
validate your schema markup
using [Google's Structured Data Testing Tool](https://developers.google.com/search/docs/appearance/structured-data) to
ensure it is implemented correctly.

### Template vs Module Implementations for Structured Data in HubSpot

When deciding how to implement your structured data in HubSpot, there are two options to consider. It's important to
choose the option that suits your needs best.

#### Option 1: Adding code at the Template level

This option involves adding the code at the template level. It works well when you have a single schema that applies
consistently to your content. For example, if you have a blog that only contains news articles, you can simply include
the Article schema in the template. In this case, your content editor doesn't need to worry about adding any additional
information.

#### Option 2: Creating a Module

The second option is to create a custom module, either Local or Global, to use on pages or blogs. This method is ideal
when you have multiple schema types (such as Article, Event, JobPosting, etc.) that you want to implement within your
blog. You can offer options for the content editor to choose from when publishing each piece of content.

## Let's Do Some Coding

BlogPosting schema example:

```html
<script type="application/ld+json">{% raw %}
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{content.absolute_url}}"
  },
  "headline": "{{content.title}}",
  {%- if content.use_featured_image -%}
  "image": [
    "{{content.featured_image}}"
  ],
  {%- endif -%}
  "datePublished": "{{content.publish_date|datetimeformat('%Y-%m-%dT%H:%M:%S')}}",
  "dateModified": "{{content.updated|datetimeformat('%Y-%m-%dT%H:%M:%S')}}",
  "author": {
    "@type": "Person",
    "name": "{{content.blog_post_author.full_name}}",
    "url": "{{content.parent_blog.root_url}}/author/{{content.blog_post_author.slug}}"
  },
   "publisher": {
    "@type": "Organization",
    "name": "{{site_settings.company_name or 'Company Name'}}",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.example.com/images/logo.png"
    }
  },
  "description": "{{content.meta_description|striptags|safe|truncate(160, True, '')}}",
  "url": "{{content.absolute_url}}"
}
{% endraw %}</script>
```

BreadcrumbList schema example:

```html
<script type="application/ld+json">{% raw %}
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{site_settings.company_url}}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "{{content.parent_blog.root_url}}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{content.title}}",
      "item": "{{content.absolute_url}}"
    }
  ]
}
{% endraw %}</script>
```

## Tools to Help You Implement Structured Data in HubSpot

There are several tools available to help you implement structured data in HubSpot. One of the most popular tools is:

- [Schema App](https://www.schemaapp.com/), which offers a free trial and paid plans. Schema App allows you to easily
- [JSON-LD](https://jsonld.com/), which is a free tool that allows you to generate JSON-LD code for your website. It
  also provides a helpful guide on how to implement structured data in HubSpot.
- [Google's Structured Data Testing Tool](https://developers.google.com/search/docs/appearance/structured-data), which
  allows you to validate your schema markup and preview how it will appear in search results.
- [Google's Rich Results Test](https://search.google.com/test/rich-results), which allows you to test your schema
  markup and preview how it will appear in search results.
- [Google's Search Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery), which
  provides a list of schemas that can be used to enhance your website's search results.
- [Google's Structured Data Markup Helper](https://www.google.com/webmasters/markup-helper/), which allows you to
  generate structured data markup for your website.
- [TechnicalSEO.com's Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/), which allows
  you to generate structured data markup for your website.
- [Schema.org](https://schema.org/), which provides a list of schemas that can be used to enhance your website's search
  results.

## Conclusion

In conclusion, incorporating structured data in HubSpot is a powerful tactic to enhance your website's SEO. By providing
search engines with more information about your content, you can improve its visibility, attract more organic traffic,
and enhance the user experience. Don't overlook the importance of schema markup in your SEO strategy. Implement it in
your HubSpot templates today and reap the benefits of higher search rankings and increased website traffic. Stay ahead
of the competition and make the most out of your HubSpot platform by leveraging the power of structured data.

{% signature %}
